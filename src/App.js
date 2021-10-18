import { useEffect, useState } from "react";
import "./App.scss";
import Editor from "./components/Editor/Editor";
import { Tabs } from "antd";
import { Select } from "antd";
import { template } from "./components/Template/template";

const { TabPane } = Tabs;
const themes = [
    "monokai",
    "dracula",
    "github",
    "tomorrow",
    "kuroir",
    "xcode",
    "vibrant_ink",
    "twilight",
    "eclipse",
    "dawn",
    "clouds",
    "chrome",
];
const { Option } = Select;
themes.forEach((them) => require(`ace-builds/src-noconflict/theme-${them}`));

function App() {
    const [html, setHtml] = useState(template[0].value);
    const [css, setCss] = useState(template[1].value);
    const [js, setJs] = useState(template[2].value);
    const [srcDoc, setSrcDoc] = useState("");
    const [theme, setTheme] = useState(themes[0]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <script>${js}</script>
                    <style>${css}</style>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <div className="App">
            <div className="editor-header">
                <Select
                    className="editor-selection__themes"
                    value={theme}
                    onChange={(e) => setTheme(e)}
                >
                    {themes.map((e) => (
                        <Option key={e}>
                            {e.substring(0, 1).toUpperCase() +
                                e.substring(1, e.length)}
                        </Option>
                    ))}
                </Select>
            </div>
            <Tabs type="card" onTabScroll={{ direction: "left" }}>
                <TabPane
                    key="html"
                    tab={
                        <span>
                            <i className="fab fa-html5"></i>
                            HTML
                        </span>
                    }
                >
                    <Editor
                        language="html"
                        value={html}
                        setValue={setHtml}
                        theme={theme}
                    />
                </TabPane>
                <TabPane
                    key="css"
                    tab={
                        <span>
                            <i className="fab fa-css3-alt"></i>
                            CSS
                        </span>
                    }
                >
                    <Editor
                        language="css"
                        value={css}
                        setValue={setCss}
                        theme={theme}
                    />
                </TabPane>
                <TabPane
                    key="js"
                    tab={
                        <span>
                            <i className="fab fa-js-square"></i>
                            Javascript
                        </span>
                    }
                >
                    <Editor
                        language="javascript"
                        value={js}
                        setValue={setJs}
                        theme={theme}
                    />
                </TabPane>
            </Tabs>
            <iframe
                className="output"
                title="editor"
                sandbox="allow-scripts"
                srcDoc={srcDoc}
            />
        </div>
    );
}

export default App;
