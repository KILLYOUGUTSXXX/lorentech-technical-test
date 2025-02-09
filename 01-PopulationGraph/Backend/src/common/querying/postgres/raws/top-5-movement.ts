export const increasing = `
with q_periode as (
  select to_char($periode::date - interval '1 month', 'YYYY-MM') as periode
  union all
  select to_char($periode::date, 'YYYY-MM') as periode
), q_increasing as (
  select
    row_number() over(partition by b.province_code order by a.periode) as seq,
    count(1) over(partition by b.province_code) as count_per_province,
    b.province_code,
    a.periode,
    sum(coalesce(b.value, 0)) as value,
    (
      sum(coalesce(b.value, 0)) - (
        sum(sum(coalesce(b.value, 0))) over(partition by b.province_code ROWS UNBOUNDED PRECEDING) - sum(coalesce(b.value, 0))
      )
    ) as increasing
  from q_periode a
  left join tbl_monthly_populations b on a.periode = to_char(b.periode, 'YYYY-MM')
  group by a.periode, b.province_code
) select
  x.province_code,
  z.province_name,
  x.value,
  x.increasing
from q_increasing x
left join tbl_provinces z on x.province_code = z.province_code
where x.seq = 2 or x.count_per_province = 1
order by x.increasing desc
limit 5;
`

export const decreasing = `
with q_periode as (
  select to_char($periode::date - interval '1 month', 'YYYY-MM') as periode
  union all
  select to_char($periode::date, 'YYYY-MM') as periode
), q_decreasing as (
  select
    row_number() over(partition by b.province_code order by a.periode) as seq,
    count(1) over(partition by b.province_code) as count_per_province,
    b.province_code,
    a.periode,
    sum(coalesce(b.value, 0)) as value,
    (
      (
        sum(sum(coalesce(b.value, 0))) over(partition by b.province_code ROWS UNBOUNDED PRECEDING) - sum(coalesce(b.value, 0))
      ) - sum(coalesce(b.value, 0))
    ) as decreasing
  from q_periode a
  left join tbl_monthly_populations b on a.periode = to_char(b.periode, 'YYYY-MM')
  group by a.periode, b.province_code
) select
  x.province_code,
  z.province_name,
  x.value,
  abs(x.decreasing) as decreasing
from q_decreasing x
left join tbl_provinces z on x.province_code = z.province_code
where x.seq = 2 or x.count_per_province = 1
order by abs(x.decreasing) desc
limit 5;
`
