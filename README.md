# AI Food Systems - 30 Day Build

Built by Rayan Nakum, Economics graduate, Chef, AI builder.

## The problem
Eating well on a tight budget is hard. I lived it. So I built the tools I wish I had.

## 4 systems I'm building
1. Budget meal planner
2. Fridge to recipe tool
3. Nutrition + cost tracker
4. Budget forecast model

## Tools
Claude, Make.com, Google Forms, Google Sheets, Vercel

## Follow the build
Portfolio: https://www.rayannakum.co.uk/#

## System 1 - Budget Meal Planner

### The prompt (v2)
Personalised meal plan generator — inputs name, budget, 
days, dietary requirements, nearest supermarket.
Outputs full HTML meal plan with costs, nutrition, 
calories and shopping list.

### How it works
Google Form → Make.com → Anthropic Claude → Gmail

### Status
- Prompt: working
- Automation: working
- HTML email output: working 
- Token limit: set to 5000 
- End to end test: complete

### Output sample
- 7 day meal plan
- Per meal: cost, calories, protein, carbs, fat
- Shopping list with supermarket prices
- Personalised intro and sign off

### Try it
bit.ly/rayeats-mealplanner

## System 2 - Fridge to Recipe Tool
How it works
Photo upload → Claude Vision → Recipe output

### Status
* End to end: working
* Vision identification: working
* Recipe generation: working

### Try it
rayannakum.co.uk/fridge-to-recipe

## System 3 - Recipe Budget Scorer
How it works
Recipe text or URL → Claude AI → A to F grade

### Status
* Scoring: working
* Grading system: working
* Ingredient cost breakdown: working
* End to end test: complete

Try it
rayannakum.co.uk/recipe-scorer

## System 4 - Budget Forecast Model
How it works
R-based cost per serving model across common meals, budget ranges and supermarkets.

### Status
* In progress
