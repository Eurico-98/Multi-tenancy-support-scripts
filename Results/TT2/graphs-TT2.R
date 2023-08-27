# Load required libraries
library(jsonlite)
library(dplyr)
library(purrr)  # Load the purrr package
library(ggplot2)


# Read statistics files for each approach
base_path <- "C:/Users/eurico/Desktop/Fac/Faculdade/Mestrado/Estágio curricular/Multi-tenancy-support-scripts/Results/TT2"
#approach_filenames <- c("A1-TT-2-results/statistics.json","A2-TT-2-results/statistics.json","A3-TT-2-results/statistics.json")

approach_filenames <- c("A1-TT-2-results/RF.json",  "A2-TT-2-results/RF.json",  "A3-TT-2-results/RF.json")

# Initialize a list to store data for each approach
approach_data <- list()

# Read and process data for each approach and thread
for (approach_filename in approach_filenames) {
  approach_path <- file.path(base_path, approach_filename)
  approach_data_raw <- fromJSON(approach_path)
  
  approach_number <- sub("A(\\d+)-.*", "\\1", approach_filename)
  approach_name <- paste("Approach", approach_number)
  
  
  approach_query_data <- approach_data_raw %>%
    imap(.f = ~ {
      thread_query_name <- .y
      thread_query_parts <- unlist(strsplit(thread_query_name, " - "))
      
      data.frame(
        Query = thread_query_parts[length(thread_query_parts)],  # Extract the last element for the query
        Approach = approach_name,
        Thread = thread_query_parts[1],
        Throughput = .x$throughput
      )
    }) %>%
    bind_rows()  # Combine data frames for each approach
  
  approach_data[[approach_name]] <- approach_query_data
}


# Combine data for all approaches
data <- bind_rows(approach_data)

# Define the custom order of queries
#custom_query_order <- c("Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15", "Q16", "Q18", "Q19", "Q21", "Q22", "Total")

custom_query_order <- c("RF1", "RF2")

# Calculate the average throughput for each query of each approach
average_data <- data %>%
  group_by(Query, Approach) %>%
  summarize(AverageThroughput = mean(Throughput))

# Set the levels of the Query factor according to the custom order
average_data$Query <- factor(average_data$Query, levels = custom_query_order)

# Create a data frame with max values for each combination of Query and Approach
max_values_data <- expand.grid(Query = custom_query_order, Approach = c("Approach 1", "Approach 2", "Approach 3"))
max_values_data <- merge(max_values_data, average_data, by = c("Query", "Approach"))
max_values_data$MaxValue <- pmax(max_values_data$AverageThroughput)


# Create the plot
plot <- ggplot(average_data, aes(x = AverageThroughput, y = Query, fill = Approach)) +
  geom_bar(stat = "identity", position = "dodge") +
  geom_text(data = max_values_data, aes(x = MaxValue, label = sprintf("%0.0f", MaxValue)),
            hjust = -0.2, vjust = -1.1 * (as.numeric(max_values_data$Approach) - 2), color = "black", size = 2.5) +
  scale_x_continuous(
    labels = scales::number_format(scale = 1, accuracy = 1)
  ) +
  labs(x = "Average Throughput - Transactions/sec", y = "Queries", fill = "Approach",
       title = "Throughput Test 2 Results") +  # Add title here
  theme_minimal() +
  theme(legend.position = "bottom",
        plot.title = element_text(hjust = 0.5)) +  # Center the title
  coord_cartesian(ylim = c(0, max(data$Throughput) * 0.04)) # adjust height for RF graph # Center the title  # Center the title


# Display the plot
print(plot)
