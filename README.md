
## Media Coverage on Israel-Palestine Conflict

---

# Overview

This project is part of our Columbia's MS Data Science Programme's Exploratory Data Analysis and Visualization (EDAV) course. It focuses on analyzing Reddit discussions during the Israel-Hamas conflict of 2023 to understand how significant global events influence online discourse. Using the IsamasRed dataset, we explored temporal trends, engagement metrics, and thematic conversations across subreddits.

The repository is structured to allow for reproducibility and ease of exploration, with each section of the analysis documented in Quarto files (.qmd) and outputs.

## Repository Structure
•	docs/: Contains the rendered HTML outputs of the Quarto notebooks for the project.
•	scripts/: R scripts used for preprocessing, analysis, and visualization.
•	README.md: Documentation for the project.
•	.qmd Files:
  •	index.qmd: Introduction and objectives of the project.
  •	data.qmd: Description of the dataset and missing value analysis.
  •	results.qmd: Visualization and discussion of key findings.
  •	conclusion.qmd: Summarizes main takeaways, limitations, and future directions.
  •	d3graph.qmd: Visualization using D3.js for interactive charts (if applicable).
•	israel-palestine-media-analysis.Rproj: RStudio project file for managing the environment.

## Dataset
The IsamasRed dataset was used for this project. It tracks Reddit discussions on the Israel-Hamas conflict from August to November 2023, including:
	•	412,258 submissions and 8,089,095 comments.

Attributes in Submissions
	•	subreddit: The subreddit where the submission was posted.
	•	id: Unique identifier for the submission.
	•	author: Username of the person who submitted the post.
	•	timestamp: The date and time of the submission.
	•	title: The title of the submission.
	•	text: Supplemental text for the title (optional; may be missing).
	•	score: The difference between the number of upvotes and downvotes.
	•	upvote_ratio: The proportion of upvotes to the total number of votes (upvotes / (upvotes + downvotes)).
	•	upvotes: Total number of upvotes the submission received.

Attributes in Comments
	•	subreddit: The subreddit where the comment was posted.
	•	id: Unique identifier for the comment.
	•	text: Content of the comment.
	•	author: Username of the commenter.
	•	timestamp: The date and time the comment was posted.
	•	submission_id: ID of the submission to which the comment belongs.
	•	controversial: Binary label (1 or 0) indicating if the comment is controversial (as determined by Reddit).
	•	score: The difference between upvotes and downvotes on the comment.
	•	ups: Number of upvotes the comment received.
	•	downs: Number of downvotes the comment received.
	•	parent_id: Identifier for the parent comment or submission the comment is replying to.

Attributes in Conversations
	•	Each conversation includes one submission and all its associated comments:
	•	Submission Attributes: Same as listed above (e.g., subreddit, id, author, etc.).
	•	comments_df: A nested dataframe containing all comment details related to the submission.
	•	freepalestine_islamophobia: Binary label (0 or 1) indicating if the conversation relates to the topic of Free Palestine/Islamophobia.
	•	zionism_antisemitism: Binary label (0 or 1) indicating if the conversation relates to the topic of Zionism/Antisemitism.
 
The full original dataset was requested from Kai Chen [https://github.com/kaichen23/israel-hamas] 

## Key Findings
1.	Trends Over Time:
	•	Submission and comment volumes spiked significantly on October 7, 2023, following the Hamas attack on Israel.
	•	Sustained engagement reflected the ongoing global attention to the conflict.

2.	Engagement Metrics:
	•	Correlations between unique users, submissions, and upvotes revealed patterns of concentrated activity by smaller, highly active user groups.
	•	Controversial posts showed distinct, though limited, engagement patterns.

3.	Thematic Conversations:
	•	Discussions were categorized into themes like “FreePalestine&Islamophobia” and “Zionism&Antisemitism.”
	•	General subreddits like “worldnews” showed broader but less polarized engagement, while niche subreddits had more focused discourse.

## Limitations
Missing text in text fields for submissions and comments, likely due to deleted or moderated content, limited text-based analysis. Moreoer, due to file size constraints, comments were resampled to 500,000 rows and conversations to 50,000 rows, which may have reduced granularity. There could also be platform bias, as insights are specific to Reddit and may not reflect broader public sentiment.

## Future Directions
1.	Expand analysis to other platforms like Twitter or Facebook for comparative insights.
2.	Extend the timeframe to analyze the evolution of discourse beyond the immediate escalation period.
3.	Extend the project to model sentiment and ideological polarization using NLP.
