import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const languages = ["html", "css", "javascript"];

languages.forEach((lang) => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});

function Editor(props) {
    const { language, value, setValue, theme } = props;

    const handleChange = (value) => {
        setValue(value);
    };

    return (
        <div className="editor-container">
            <AceEditor
                mode={language}
                theme={theme}
                value={value}
                onChange={handleChange}
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                    fontSize: 16,
                    enableSnippets: true,
                    showLineNumbers: true,
                }}
            />
        </div>
    );
}

export default Editor;
