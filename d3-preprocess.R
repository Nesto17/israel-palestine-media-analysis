# This script is used to preprocess comments data to generate the data required for the D3 script.

library(dplyr)
library(jsonlite)

data <- read_csv("https://edav-final-project.s3.us-east-2.amazonaws.com/comments.csv")

grouped <- data %>%
  mutate(date = as_date(timestamp)) %>%
  group_by(subreddit, date) %>%
  summarise(comment_count = n(), .groups = 'drop')

subreddit_rank <- grouped %>%
  group_by(subreddit) %>%
  summarise(total_comments = sum(comment_count), .groups = "drop") %>%
  arrange(desc(total_comments)) %>%
  mutate(overall_rank = row_number())

grouped <- grouped %>%
  left_join(subreddit_rank, by = "subreddit")

write_json(grouped, "data/d3/linechart_data.json")