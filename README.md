# Motion-Planning-Obstacle-based-PRM

This project, built with React, implements a solution to the motion planning problem using the Obstacle-Based Probabilistic Roadmap (PRM) method. Given a set of obstacles and parameters, the algorithm finds a feasible path between defined start and end points. Once the solution is computed, users can download it by clicking a button.

## Table of Contents

-   [Problem Statement](#problem-statement)
-   [Algorithm Overview](#algorithm-overview)
-   [Input Format](#input-format)
-   [Output](#output)

## Problem Statement

The motion planning problem aims to find a valid path from a designated start point to an end point while avoiding obstacles. In this implementation, the Obstacle-Based PRM method is used to construct a roadmap that navigates through free space while respecting the positions and shapes of defined obstacles.

The input includes:

-   **Start and End Points**: Coordinates that mark the beginning and goal of the path.
-   **Obstacles**: Represented as polygons that must be avoided during path planning.
-   **Additional Parameters**: Including seed for randomness, vertex count, density, and size, which influence the roadmap construction.

## Algorithm Overview

The algorithm leverages the **Obstacle-Based Probabilistic Roadmap (PRM)**, which is a sampling-based approach to path planning. Here's a high-level breakdown of the process:

1. **Sampling**: The algorithm generates random samples in the free space (avoiding obstacle regions) to create nodes in the roadmap.
2. **Connection**: Each node is connected to nearby nodes, forming edges that represent feasible paths within the free space.
3. **Path Search**: Using graph search techniques, the roadmap is traversed to find a valid path from the start point to the end point.

The Obstacle-Based PRM focuses on the regions near obstacles, which helps in generating feasible paths through complex, obstacle-dense environments.

## Input Format

The algorithm accepts input as a JSON array with the following structure:

```json
[
    {
        "type": "info",
        "seed": 3755816400,
        "countVertex": 6,
        "density": 7,
        "size": 7
    },
    {
        "type": "startPoint",
        "x": 2.0,
        "y": 2.0
    },
    {
        "type": "endPoint",
        "x": 98.0,
        "y": 98.0
    },
    {
        "type": "polygon",
        "points": [
            {
                "type": "point",
                "x": 1.9549692447214089,
                "y": 6.964949445866493
            },
            {
                "type": "point",
                "x": 6.2884032406480515,
                "y": 8.924814111738717
            },
            {
                "type": "point",
                "x": 8.318847623988624,
                "y": 15.636056620347873
            },
            {
                "type": "point",
                "x": 1.7726920757691749,
                "y": 18.761599276897606
            },
            { "type": "point", "x": 0.0, "y": 15.585786456389272 },
            { "type": "point", "x": 0.0, "y": 8.486133475872588 }
        ]
    }
]
```

## Input Parameters

-   **info**: Configuration parameters for the algorithm:
-   **seed**: Seed for randomness in the PRM generation process.
-   **countVertex**: Number of vertices used to form the roadmap.
-   **density**: Density factor influencing node connection in the roadmap.
-   **size**: Size parameter affecting obstacle handling.
-   **startPoint**: The starting coordinate (x, y).
-   **endPoint**: The destination coordinate (x, y).
-   **polygon**: A list of points defining polygonal obstacles. Each polygon is represented as a set of vertices (points) that form its boundary.

## Output

The algorithm outputs a solution file that contains the computed path from the start to the end point, avoiding all obstacles. After the path is generated, users can download the file by pressing a download button. The format of the output path is suitable for further analysis or visualization in compatible applications.

## Demo

<p>Solution at average density and average size:</p>
<img width="500" alt="Screenshot 2024-11-14 at 20 40 37" src="https://github.com/user-attachments/assets/d7fbaeb9-4dae-4c42-9434-d52da9bc80b7">

<p>Solution at high density and small size:</p>
<img width="500" alt="Screenshot 2024-11-14 at 20 40 50" src="https://github.com/user-attachments/assets/6ec9b195-3cf1-4c7f-a70e-253fffc11821">

