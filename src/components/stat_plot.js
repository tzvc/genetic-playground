import React from "react";
import styled from "styled-components";
import {
	XYPlot,
	LineSeries,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines
} from "react-vis";

const StatPlotContainer = styled.div``;

const StatPlot = ({ best_fitness_data }) => (
	<StatPlotContainer>
		<XYPlot width={300} height={200}>
			{/* <HorizontalGridLines />
			<VerticalGridLines /> */}
			<LineSeries
				data={best_fitness_data.map(p => ({ x: p.generation, y: p.fitness }))}
				color="red"
				curve={null}
				opacity={1}
				strokeStyle="solid"
				strokeWidth="1px"
			/>
			<XAxis
				title="generation"
				style={{
					line: { stroke: "#fff" },
					ticks: { stroke: "#fff" },
					text: { stroke: "none", fill: "#fff", fontWeight: 600 },
					title: { stroke: "none", fill: "#fff", fontWeight: 600 }
				}}
			/>
			<YAxis
				title="fitness"
				style={{
					line: { stroke: "#fff" },
					ticks: { stroke: "#fff" },
					text: { stroke: "none", fill: "#fff", fontWeight: 600 },
					title: { stroke: "none", fill: "#fff", fontWeight: 600 }
				}}
			/>
		</XYPlot>
	</StatPlotContainer>
);

export default StatPlot;
