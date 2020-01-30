### Genetic playground

A Javascript web application to explore and experiment with evolutionary computation principles.

Simulation is comprised of a population of robots with a single wheel whose rotation speed and direction are controlled by a standard PID controller. Parameters for this controller is to be optimized over generations by the genetic algorithm in order to ensure their survival in a challenging environment (bumpy wheel with increasing rotation speed).

Developed by [@theo_champion](https://github.com/theochampion) as part of the evolutionary computing course at RMIT university.

- Source code available at https://github.com/theochampion/genetic-playground
- Demo available at https://theochampion.github.io/genetic-playground/
- Report paper available at https://github.com/theochampion/genetic-playground/blob/master/rmit_report_paper_theo.pdf

### Genetic configuration parameters

| Name            | Default | Range/Type  | Description                                              |
| --------------- | ------- | ----------- | -------------------------------------------------------- |
| Population Size | 100     | Real Number | Size of the population                                   |
| Crossover Rate  | 0.6     | [0.0, 1.0]  | Probability of crossover operation (multi point)         |
| Mutation Rate   | 0.1     | [0.0, 1.0]  | Probability of mutation operation (safe random bit flip) |

### Selection operators

| Individual Selectors            | Description                                 |
| ------------------------------- | ------------------------------------------- |
| IndividualSelectors.Tournament2 | Select fittest of two random individuals    |
| IndividualSelectors.Tournament3 | Select fittest of three random individuals  |
| IndividualSelectors.Fittest     | Select fittest individual of the population |
| IndividualSelectors.Random      | Select a random individual                  |

| Pair-wise (parents) Selectors  | Description                                                         |
| ------------------------------ | ------------------------------------------------------------------- |
| ParentsSelectors.Tournament2   | Select a pair of individual using `IndividualSelectors.Tournament2` |
| ParentsSelectors.Tournament3   | Select a pair of individual using `IndividualSelectors.Tournament3` |
| ParentsSelectors.Random        | Select a pair of random individuals                                 |
| ParentsSelectors.FittestRandom | Select a pair of the fittest and a random individual                |
