---
title: "Data & Visualization Slides"
description: "Create charts, tables, KPIs, and data visualizations in Deckyard"
---

# Data & Visualization Slides

Display your data effectively with Deckyard's visualization slide types.

## Chart Slide

Create bar, line, and pie charts from simple CSV/TSV data.

![Chart slide editor with bar chart and CSV data input](/images/screenshots/chart-slide-editor.png)

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Chart title (max 120 chars) |
| `subheading` | No | Subtitle below the title |
| `bottomSubheading` | No | Text at bottom of slide |
| `chartType` | Yes | `bar`, `line`, or `pie` |
| `data` | Yes | CSV/TSV formatted data |
| `xLabel` | No | X-axis label |
| `yLabel` | No | Y-axis label |
| `series1Label` | No | Legend label for first series |
| `series2Label` | No | Legend label for second series |
| `showLegend` | No | `yes` or `no` |
| `showValues` | No | Display values on chart |
| `pieLabelMode` | No | `none`, `value`, `%`, or `both` |

### Data Format

Enter data as CSV (comma-separated) or TSV (tab-separated):

```
Label,Value
Q1,100
Q2,150
Q3,125
Q4,200
```

For line charts with two series:

```
Month,Sales,Costs
Jan,100,80
Feb,120,85
Mar,140,90
```

### Chart Types

- **Bar Chart** - Vertical bars for comparing values
- **Line Chart** - Connected points showing trends over time (supports 2 series)
- **Pie Chart** - Proportional segments for showing parts of a whole

---

## Table Slide

Display structured data in a table format with up to 10 columns and 40 rows.

![Table slide editor with grid interface](/images/screenshots/table-slide-editor.png)

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Table title |
| `caption` | No | Table caption/footnote |
| `headerRow` | No | Enable/disable header row (`on`/`off`) |
| `animateByCell` | No | Step-through animation by cell |
| `colCount` | No | Number of columns (1-10) |
| `rows` | No | Array of row data |

### Features

- **Header Row** - First row is styled as a header
- **Markdown Support** - Cells support inline markdown (bold, italic, links)
- **Animation** - Optionally reveal table content row-by-row or cell-by-cell during presentation

---

## KPI Metrics Slide

Showcase key performance indicators with large numbers, units, and change indicators.

![KPI slide editor with metrics fields](/images/screenshots/kpi-slide-editor.png)

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Slide title |
| `subheading` | No | Subtitle |
| `bottomSubheading` | No | Bottom text |
| `accent` | No | `none`, `highlight-best`, or `highlight-risk` |
| `countUp` | No | Animate numbers counting up (`on`/`off`) |
| `metrics` | No | Array of 1-4 metrics |

### Metric Fields

Each metric can have:
- `value` - The number (e.g., "1.2")
- `unit` - Unit suffix (e.g., "M", "%", "k€")
- `label` - Metric name (e.g., "Revenue")
- `delta` - Change indicator (e.g., "+12%", "-5%")
- `note` - Additional context (e.g., "vs last year")

### Delta Styling

Delta values are automatically styled:
- Values starting with `+` appear in positive (green) styling
- Values starting with `-` or `−` appear in negative (red) styling

---

## Matrix Slide

Create 2x2 or larger matrix diagrams for framework presentations.

### Use Cases

- BCG Matrix (Growth/Share)
- Eisenhower Matrix (Urgent/Important)
- Risk Assessment grids
- Competitive positioning

---

## Funnel Slide

Visualize conversion funnels and progressive filtering of data.

### Use Cases

- Sales funnels
- Marketing conversion rates
- User journey stages
- Process filtering

---

## Pyramid Slide

Display hierarchical information in pyramid format.

### Use Cases

- Organizational hierarchies
- Maslow's hierarchy
- Priority frameworks
- Value propositions

---

## Cycle Slide

Create circular process diagrams showing recurring workflows.

### Use Cases

- Continuous improvement cycles
- Seasonal processes
- Feedback loops
- Iterative workflows

---

## Related

- [Slide Types Overview](/docs/slide-types/)
- [Interactive Slides](/docs/slide-types/interactive/)
- [Export Formats](/docs/export/)
