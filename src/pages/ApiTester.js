import React, { useState } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const ApiTester = () => {
    const [tabCount, setTabCount] = useState(1);

    const [tabs, setTabs] = useState([
        {
            id: tabCount,
            url: "",
            method: "GET",
            headers: "",
            body: "",
            response: "",
            status: null,
        },
    ]);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const addTab = () => {
        const newTabCount = tabCount + 1;
        const newTabs = [
            ...tabs,
            {
                id: newTabCount,
                url: "",
                method: "GET",
                headers: "",
                body: "",
                response: "",
                status: null,
            },
        ];
        setTabCount(newTabCount);
        setTabs(newTabs);
        setActiveTab(newTabs.length - 1);
    };

    const closeTab = (id) => {
        const newTabs = tabs.filter((tab) => tab.id !== id);
        setTabs(newTabs);
        setActiveTab(Math.min(activeTab, newTabs.length - 1));
    };

    const sendRequest = async () => {
        const currentTab = tabs[activeTab];
        try {
            const axiosConfig = {
                method: currentTab.method,
                headers: currentTab.headers
                    ? JSON.parse(currentTab.headers)
                    : {},
                data: currentTab.body ? JSON.parse(currentTab.body) : {},
            };

            const apiResponse = await axios(currentTab.url, axiosConfig);

            const newTabs = tabs.map((tab) =>
                tab.id === currentTab.id
                    ? {
                          ...tab,
                          response: JSON.stringify(apiResponse.data, null, 2),
                          status: apiResponse.status,
                      }
                    : tab
            );

            setTabs(newTabs);
        } catch (error) {
            const newTabs = tabs.map((tab) =>
                tab.id === currentTab.id
                    ? {
                          ...tab,
                          response: `Error: ${error.message}`,
                          status: error.response ? error.response.status : null,
                      }
                    : tab
            );
            setTabs(newTabs);
        }
    };

    return (
        <div className="api-tester-container">
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className="tabs"
                centered
            >
                {tabs.map((tab) => (
                    <Tab
                        className="tab"
                        key={tab.id}
                        label={`Request ${tab.id}`}
                        icon={
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeTab(tab.id);
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    />
                ))}
                <Button onClick={addTab} variant="contained" size="small">
                    + Add
                </Button>
            </Tabs>
            {tabs.map((tab, index) => (
                <TabPanel
                    key={tab.id}
                    value={activeTab}
                    index={index}
                    className="tab-panel"
                >
                    <div className="api-main">
                        <TextField
                            select
                            className="tab-method"
                            label="Method"
                            value={tab.method}
                            onChange={(e) =>
                                setTabs((prevTabs) =>
                                    updateTab(
                                        prevTabs,
                                        tab.id,
                                        "method",
                                        e.target.value
                                    )
                                )
                            }
                            variant="outlined"
                        >
                            <MenuItem value="GET">GET</MenuItem>
                            <MenuItem value="POST">POST</MenuItem>
                            <MenuItem value="POST" disabled>
                                DELETE
                            </MenuItem>
                            <MenuItem value="POST" disabled>
                                PUT
                            </MenuItem>
                        </TextField>
                        <TextField
                            className="tab-url"
                            fullWidth
                            label="API URL"
                            value={tab.url}
                            onChange={(e) =>
                                setTabs((prevTabs) =>
                                    updateTab(
                                        prevTabs,
                                        tab.id,
                                        "url",
                                        e.target.value
                                    )
                                )
                            }
                            variant="outlined"
                        />
                    </div>

                    <TextField
                        fullWidth
                        className="tab-header"
                        label="Headers"
                        value={tab.headers}
                        onChange={(e) =>
                            setTabs((prevTabs) =>
                                updateTab(
                                    prevTabs,
                                    tab.id,
                                    "headers",
                                    e.target.value
                                )
                            )
                        }
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        className="tab-body"
                        label="Request Body"
                        value={tab.body}
                        onChange={(e) =>
                            setTabs((prevTabs) =>
                                updateTab(
                                    prevTabs,
                                    tab.id,
                                    "body",
                                    e.target.value
                                )
                            )
                        }
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                    <Button
                        onClick={sendRequest}
                        variant="contained"
                        color="primary"
                        className="tab-btn"
                    >
                        Send Request
                    </Button>
                    <div className="response-container">
                        <Typography variant="h6">Response:</Typography>
                        <pre>{tab.response}</pre>
                    </div>
                </TabPanel>
            ))}
        </div>
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

export default ApiTester;

function updateTab(tabs, id, field, value) {
    return tabs.map((tab) =>
        tab.id === id ? { ...tab, [field]: value } : tab
    );
}
