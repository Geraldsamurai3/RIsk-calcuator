import { v4 as uuidv4 } from "uuid"
import { RiskCategory } from "../enums/risk-category.enum"
import { type RiskLevel, calculateRiskLevel } from "../enums/risk-level.enum"

export class Risk {
  id: string
  title: string
  description?: string
  category: RiskCategory
  likelihood: number // 1-5
  impact: number // 1-5
  riskScore: number // calculated: likelihood * impact
  riskLevel: RiskLevel // calculated based on riskScore
  createdAt: Date
  updatedAt: Date

  constructor(data: Partial<Risk>) {
    this.id = data.id || uuidv4()
    this.title = data.title || ""
    this.description = data.description
    this.category = data.category || RiskCategory.INVASION
    this.likelihood = data.likelihood || 1
    this.impact = data.impact || 1
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()

    // Calculate derived fields
    this.calculateRiskMetrics()
  }

  private calculateRiskMetrics(): void {
    this.riskScore = this.likelihood * this.impact
    this.riskLevel = calculateRiskLevel(this.riskScore)
  }

  update(data: Partial<Risk>): void {
    if (data.title !== undefined) this.title = data.title
    if (data.description !== undefined) this.description = data.description
    if (data.category !== undefined) this.category = data.category
    if (data.likelihood !== undefined) this.likelihood = data.likelihood
    if (data.impact !== undefined) this.impact = data.impact

    this.updatedAt = new Date()
    this.calculateRiskMetrics()
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      likelihood: this.likelihood,
      impact: this.impact,
      riskScore: this.riskScore,
      riskLevel: this.riskLevel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
