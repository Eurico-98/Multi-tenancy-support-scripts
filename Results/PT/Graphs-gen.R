# Load required libraries
library(jsonlite)
library(ggplot2)

# Read statistics files for each approach
approach1 <- fromJSON("C:/Users/eurico/Desktop/Fac/Faculdade/Mestrado/Estágio curricular/Multi-tenancy-support-scripts/Results/PT/A1-PT-results/statistics.json")
approach2 <- fromJSON("C:/Users/eurico/Desktop/Fac/Faculdade/Mestrado/Estágio curricular/Multi-tenancy-support-scripts/Results/PT/A2-PT-results/statistics.json")
approach3 <- fromJSON("C:/Users/eurico/Desktop/Fac/Faculdade/Mestrado/Estágio curricular/Multi-tenancy-support-scripts/Results/PT/A3-PT-results/statistics.json")

# Extract throughput values for each query
#queries <- c("Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15", "Q16", "Q18", "Q19", "Q21", "Q22")  # List of query names
queries <- c("RF1", "RF2")

throughput1 <- sapply(queries, function(query) approach1[[query]]$throughput)
throughput2 <- sapply(queries, function(query) approach2[[query]]$throughput)
throughput3 <- sapply(queries, function(query) approach3[[query]]$throughput)

# Create a data frame for plotting
data <- data.frame(
  Query = factor(queries, levels = queries),  # Order queries by number
  Approach = rep(c("Approach 1", "Approach 2", "Approach 3"), each = length(queries)),
  Throughput = c(throughput1, throughput2, throughput3)
)

# Create a data frame with max values for each combination of Query and Approach
max_values_data <- expand.grid(Query = queries, Approach = c("Approach 1", "Approach 2", "Approach 3"))
max_values_data$MaxValue <- pmax(
  data[data$Query %in% max_values_data$Query & data$Approach == max_values_data$Approach, ]$Throughput
)

# Create the plot
plot <- ggplot(data, aes(x = Throughput, y = Query, fill = Approach)) +
  geom_bar(stat = "identity", position = "dodge") +
  geom_text(data = max_values_data, aes(x = MaxValue, y = Query, label = sprintf("%0.0f", MaxValue)),
            hjust = -0.2, vjust = -1 * (as.numeric(max_values_data$Approach) - 2), color = "black", size = 2.5) +  # Adjust vjust
  scale_x_continuous(
    labels = scales::number_format(scale = 1, accuracy = 1)
  ) +
  labs(x = "Throughput - Transactions/sec", y = "Queries", fill = "Approach",
       title = "Power Test Results") +  # Add title here
  theme_minimal() +
  theme(legend.position = "bottom",
        plot.title = element_text(hjust = 0.5)) +  # Center the title
  coord_cartesian(ylim = c(0, max(data$Throughput) * 0.08)) # adjust height for RF graph

# Display the plot
print(plot)
