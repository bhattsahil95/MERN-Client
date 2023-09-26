import { dark } from "@mui/material/styles/createPalette";
import { Chrono } from "react-chrono";

const VerticalAlternatingTimeline = (props) => {
    const { data } = props;

    return (
        <Chrono
            items={data}
            mode="VERTICAL_ALTERNATING"
            itemWidth={150}
            timelinePointDimension={20}
            readMore={true}
            cardHeight={100}
            flipLayout
            enableDarkToggle
            mediaHeight={350}
            slideItemDuration={5000}
            slideShow
            fontSizes={{
                cardSubtitle: "14px",
                cardText: "14px",
                cardTitle: "15px",
                title: "15px",
            }}
            theme={{
                primary: "gray",
                secondary: "orange",
                cardBgColor: "white",
                cardForeColor: "violet",
                titleColor: "black",
                titleColorActive: "white",
                cardTitleColor: "black",
            }}
        ></Chrono>
    );
};

export default VerticalAlternatingTimeline;
