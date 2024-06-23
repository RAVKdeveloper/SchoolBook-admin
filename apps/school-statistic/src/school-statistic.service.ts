import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcPermissionDeniedException } from 'nestjs-grpc-exceptions'
import { And, Raw, Repository } from 'typeorm'

import {
  GetAllEmptyStudentsDto,
  GetAveragePointDto,
  PeriodFiltersBasic,
  PointEntity,
  StudentEntity,
  getWeek,
} from '@app/common'

@Injectable()
export class SchoolStatisticService {
  constructor(
    @InjectRepository(PointEntity) private pointRepo: Repository<PointEntity>,
    @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,
  ) {}

  public async getAveragePointStatistic(dto: GetAveragePointDto) {
    const period = this.getPeriodFiltering(dto.period)

    const points = await this.pointRepo.find({
      where: { school: { id: dto.schoolId }, ...period },
      cache: true,
      order: {
        id: 'DESC',
      },
    })

    const pointsCount = await this.pointRepo.countBy({ school: { id: dto.schoolId }, ...period })

    const averagePoint = this.getAveragePoints(points, pointsCount)

    const labelsAndValue = this.getLabelsToPointSystemStatistic(points, dto.period)

    return {
      period: dto.period,
      averagePoint,
      data: Object.values(labelsAndValue) as number[],
      labels: Object.keys(labelsAndValue),
    }
  }

  public async getEmptyStudentStatistic(dto: GetAllEmptyStudentsDto) {
    const period: Record<string, unknown> = this.getPeriodFiltering(dto.period)

    if (dto.classId) {
      period.class = { id: dto.classId }
    }

    const students = await this.studentRepo.find({
      where: { school: { id: dto.schoolId }, ...period },
      cache: true,
      order: {
        id: 'ASC',
      },
    })
  }

  private getLabelsToPointSystemStatistic(points: PointEntity[], period: string) {
    const data = {}
    const count = {}

    if (period === PeriodFiltersBasic.YEAR) {
      points.forEach(point => {
        const value = data[new Date(point.createAt).getMonth() + 1] + Number(point.point)
        data[new Date(point.createAt).getMonth() + 1] = value
        count[new Date(point.createAt).getMonth() + 1] += 1
      })

      const dataWithAveradgePoints = {}

      for (const month of Object.keys(data)) {
        const sum = Number(data[month]) / count[month]
        dataWithAveradgePoints[month] = sum
      }

      return dataWithAveradgePoints
    }

    if (period === PeriodFiltersBasic.MONTH) {
      points.forEach(point => {
        const value = data[getWeek(new Date(point.createAt))] + Number(point.point)
        data[getWeek(new Date(point.createAt))] = value
        count[getWeek(new Date(point.createAt))] += 1
      })

      const dataWithAveradgePoints = {}

      for (const week of Object.keys(data)) {
        const sum = Number(data[week]) / count[week]
        dataWithAveradgePoints[week] = sum
      }

      return dataWithAveradgePoints
    }

    if (period === PeriodFiltersBasic.WEEK) {
      points.forEach(point => {
        const value = data[new Date(point.createAt).getDay()] + Number(point.point)
        data[new Date(point.createAt).getDay()] = value
        count[new Date(point.createAt).getDay()] += 1
      })

      const dataWithAveradgePoints = {}

      for (const day of Object.keys(data)) {
        const sum = Number(data[day]) / count[day]
        dataWithAveradgePoints[day] = sum
      }

      return dataWithAveradgePoints
    }
  }

  private getLabelsEmptyStudentsStatistic(students: StudentEntity[], period: string) {}

  private getPeriodFiltering(period: string) {
    if (period === PeriodFiltersBasic.WEEK) {
      const curr = new Date()
      const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay())).toISOString()
      const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)).toISOString()

      return {
        createAt: And(
          Raw(alias => `${alias} > :startDate`, { startDate: firstDay }),
          Raw(alias => `${alias} <= :endDate`, { endDate: lastDay }),
        ),
      }
    }

    if (period === PeriodFiltersBasic.YEAR) {
      const year = new Date().getFullYear()
      const startYear = new Date(`01-01-${year}`).toISOString()
      return {
        createAt: And(
          Raw(alias => `${alias} > :startDate`, { startDate: startYear }),
          Raw(alias => `${alias} <= NOW()`),
        ),
      }
    }

    if (period === PeriodFiltersBasic.MONTH) {
      const date = new Date()
      date.setDate(date.getDate() - 30)

      return {
        createAt: And(
          Raw(alias => `${alias} > :startDate`, { startDate: date }),
          Raw(alias => `${alias} <= NOW()`),
        ),
      }
    }

    throw new GrpcPermissionDeniedException('Неверный период')
  }

  private getAveragePoints(points: PointEntity[], count: number) {
    const allPointsValue: { val: number } = { val: 0 }

    for (const point of points) {
      allPointsValue.val = allPointsValue.val + Number(point.point)
    }

    const averagePoint = Number(allPointsValue.val / count)

    if (isNaN(averagePoint)) return 0

    return averagePoint
  }
}
