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

const StatPlot = () => (
	<StatPlotContainer>
		<XYPlot width={300} height={200}>
			{/* <HorizontalGridLines />
			<VerticalGridLines /> */}
			<LineSeries
				data={[
					{
						x: 0,
						y: 10
					},
					{
						x: 1,
						y: 10.583917520614927
					},
					{
						x: 2,
						y: 11.062007677051971
					},
					{
						x: 3,
						y: 10.647425081883089
					},
					{
						x: 4,
						y: 11.069048217526852
					},
					{
						x: 5,
						y: 10.762943711731664
					},
					{
						x: 6,
						y: 11.210080434786414
					},
					{
						x: 7,
						y: 11.726992017453794
					},
					{
						x: 8,
						y: 11.660525608901823
					},
					{
						x: 9,
						y: 11.401860970945208
					},
					{
						x: 10,
						y: 11.238613338852344
					},
					{
						x: 11,
						y: 11.583586072798877
					},
					{
						x: 12,
						y: 11.634617580205555
					},
					{
						x: 13,
						y: 11.29584822683399
					},
					{
						x: 14,
						y: 11.10781885841339
					},
					{
						x: 15,
						y: 11.26766806054803
					},
					{
						x: 16,
						y: 11.115669839408259
					},
					{
						x: 17,
						y: 11.255531260690361
					},
					{
						x: 18,
						y: 10.885428556396949
					},
					{
						x: 19,
						y: 11.21577519057987
					},
					{
						x: 20,
						y: 11.39065312627686
					}
				]}
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
