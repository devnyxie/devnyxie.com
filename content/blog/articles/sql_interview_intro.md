---
title: "Introduction to SQL Interview Questions"
description: "Master common SQL interview questions and patterns to excel in data-related job interviews."
date: 2025-11-02
tags:
  - sql
  - interview
image: /images/articles/sql_interview_intro/pg.png
---

SQL interview questions are a staple of data science, analytics, and backend engineering interviews. While they may seem intimidating at first, most follow recognizable patterns that you can master with practice. This guide walks through common SQL concepts and real interview questions to help you build a systematic approach to solving them.

## Understanding the Foundation: Aggregate Functions

Before diving into complex queries, you need to understand aggregate functions—they're the workhorses of data analysis in SQL.

Aggregate functions perform calculations over groups of rows or entire tables:

- **COUNT()** returns the number of rows (or non-null values)
- **SUM()** totals numeric values
- **AVG()** calculates the average of numeric values
- **MIN() / MAX()** find the smallest or largest value

A simple example:

```sql
SELECT COUNT(*) AS total_users,
       AVG(age) AS avg_age
FROM users;
```

This returns a single row showing how many users exist and their average age.

## The Power of `GROUP BY`

The real magic happens when you combine aggregate functions with `GROUP BY`. Instead of calculating across the entire table, `GROUP BY` splits your data into groups based on column values, applying the aggregate function to each group separately.

```sql
SELECT country, COUNT(*) 
FROM users
GROUP BY country;
```

This query counts how many users exist in each country, returning one row per country. Think of `GROUP BY` as creating separate buckets—the aggregate function then works within each bucket independently.

A key rule to remember: **aggregate functions only work on grouped data when using GROUP BY**. You can't filter grouped results with `WHERE`—you need `HAVING` instead, which we'll explore next.

## Real Interview Question #1: Finding Qualified Candidates

Let's look at a LinkedIn interview question that demonstrates these concepts in action.

**Problem**: Given a table of candidates and their skills, find candidates who possess all three required skills for a Data Science job: Python, Tableau, and PostgreSQL.

**candidates table:**

|candidate_id|skill|
|---|---|
|123|Python|
|123|Tableau|
|123|PostgreSQL|
|234|R|
|234|PowerBI|
|345|Python|
|345|Tableau|

**Solution:**

```sql
SELECT candidate_id 
FROM candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
HAVING COUNT(DISTINCT skill) = 3
ORDER BY candidate_id ASC;
```

**Breaking it down:**

1. **WHERE** filters to only rows with the three required skills
2. **GROUP BY** creates one group per candidate
3. **HAVING** filters to groups where exactly 3 distinct skills appear
4. The result shows only candidates with all three skills

The critical insight: `HAVING` works on grouped data after aggregation, while `WHERE` filters individual rows before grouping.

## Real Interview Question #2: The Histogram Pattern

Twitter asked candidates to create a histogram showing how many users posted a certain number of tweets in 2022.

**Problem**: Group users by their tweet count and show how many users fall into each bucket.

**tweets table example:**

|tweet_id|user_id|msg|tweet_date|
|---|---|---|---|
|739252|111|...|01/01/2022|
|846402|111|...|02/14/2022|
|241425|254|...|03/01/2022|
|231574|148|...|03/23/2022|

**Expected output:**

|tweet_bucket|users_num|
|---|---|
|1|2|
|2|1|

This shows: 2 users posted 1 tweet each, and 1 user posted 2 tweets.

**Solution:**

```sql
SELECT tweet_bucket, COUNT(user_id) AS users_num
FROM (
  SELECT user_id, COUNT(*) AS tweet_bucket
  FROM tweets
  WHERE EXTRACT(YEAR FROM tweet_date) = 2022
  GROUP BY user_id
) AS user_tweet_counts
GROUP BY tweet_bucket;
```

**The two-level aggregation pattern:**

1. **Inner query**: Count tweets per user (first aggregation)
2. **Outer query**: Count how many users have each tweet count (second aggregation)

This "grouping groups" pattern appears frequently in histogram or distribution questions. Note that subqueries in the `FROM` clause require an alias (`user_tweet_counts`), even if you don't reference it.

## Real Interview Question #3: Finding Missing Relationships

Facebook asked candidates to find pages with zero likes—a classic example of finding what's _not_ there.

**Problem**: Return page IDs for pages that have no likes.

**Solution:**

```sql
SELECT pages.page_id
FROM pages
LEFT JOIN page_likes
  ON pages.page_id = page_likes.page_id
WHERE page_likes.page_id IS NULL
ORDER BY page_id ASC;
```

**Why LEFT JOIN?**

- `LEFT JOIN` keeps all rows from the left table (`pages`)
- For pages without likes, the joined columns from `page_likes` will be `NULL`
- `WHERE page_likes.page_id IS NULL` filters to exactly those unmatched rows

This pattern works for any "find records without a relationship" question. Always use `LEFT JOIN` (or `LEFT OUTER JOIN`) and filter for `IS NULL` on a column from the right table.

##  Real Interview Question #4: Handling NULL Values

Tesla's interview question tests whether you understand how to filter for missing data.

**Problem**: Find parts that have begun assembly but aren't finished (lack a `finish_date`).

**Solution:**

```sql
SELECT part, assembly_step
FROM parts_assembly
WHERE finish_date IS NULL;
```

The key lesson: always use `IS NULL` or `IS NOT NULL` to check for missing values, never `= NULL` (which won't work as expected in SQL).

## Real Interview Question #5: Conditional Aggregation

Sometimes you need to count different categories in a single query without multiple passes through the data.

**Method 1: Subqueries**

```sql
SELECT
  (SELECT COUNT(*) FROM viewership WHERE device_type = 'laptop') AS laptop_views,
  (SELECT COUNT(*) FROM viewership WHERE device_type IN ('phone', 'tablet')) AS mobile_views;
```

**Method 2: CASE statements (more efficient)**

```sql
SELECT
  SUM(CASE WHEN device_type = 'laptop' THEN 1 ELSE 0 END) AS laptop_views,
  SUM(CASE WHEN device_type IN ('tablet', 'phone') THEN 1 ELSE 0 END) AS mobile_views
FROM viewership;
```

The `CASE` approach scans the table once, making it faster for large datasets. Both methods produce identical results—choose based on readability and performance needs.

## Key Takeaways for SQL Interviews

1. **Master the aggregation hierarchy**: Understand how `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY` flow together
2. **Practice multi-level aggregation**: Many problems require grouping already-grouped data
3. **Know your JOINs**: Especially `LEFT JOIN` for finding missing relationships
4. **Use CASE for conditional logic**: It's more efficient than multiple subqueries
5. **Always use IS NULL**: Never use `= NULL` when checking for missing values
6. **Name your subqueries**: SQL requires aliases for subqueries in `FROM` clauses

The best way to prepare is to solve real interview questions on platforms like DataLemur, LeetCode, or HackerRank. Start with easy problems to build confidence with the fundamental patterns, then progress to medium and hard questions that combine multiple concepts. With practice, you'll start recognizing the patterns immediately and know which tools to reach for.