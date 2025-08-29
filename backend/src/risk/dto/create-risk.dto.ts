import { IsString, IsEnum, IsInt, Min, Max, IsOptional, Length } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { RiskCategory } from "../enums/risk-category.enum"

export class CreateRiskDto {
  @ApiProperty({
    description: "Risk title",
    example: "Mothership detected over major city",
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  @Length(1, 200)
  title: string

  @ApiPropertyOptional({
    description: "Detailed risk description",
    example: "Large alien vessel hovering over downtown area, showing signs of preparation for ground assault",
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string

  @ApiProperty({
    description: "Risk category",
    enum: RiskCategory,
    example: RiskCategory.INVASION,
  })
  @IsEnum(RiskCategory)
  category: RiskCategory

  @ApiProperty({
    description: "Likelihood of occurrence (1-5 scale)",
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  likelihood: number

  @ApiProperty({
    description: "Impact severity (1-5 scale)",
    minimum: 1,
    maximum: 5,
    example: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  impact: number
}
