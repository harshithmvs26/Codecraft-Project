document.addEventListener("DOMContentLoaded", function () {
    // CodeMirror Editor Initialization
    let editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        tabSize: 4,
        indentWithTabs: true
    });

    // Live Preview Update
    function updateLivePreview() {
        const codeContent = editor.getValue();
        const livePreviewDiv = document.getElementById("livePreview");

        // Clear previous content
        livePreviewDiv.innerHTML = '';

        // Create a new canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 400; // Set your desired width
        canvas.height = 400; // Set your desired height
        livePreviewDiv.appendChild(canvas);

        // Get the canvas context
        const ctx = canvas.getContext('2d');

        // Create a new function to execute the user's code
        const userCode = new Function('ctx', 'canvas', codeContent);

        // Execute the user's code with the canvas context
        try {
            userCode(ctx, canvas);
        } catch (error) {
            console.error('Error executing user code:', error);
            ctx.fillStyle = 'red';
            ctx.fillText('Error: ' + error.message, 10, 20);
        }
    }

    editor.on("change", updateLivePreview);

    document.getElementById("playButton").addEventListener("click", updateLivePreview);

    document.getElementById("pauseButton").addEventListener("click", function () {
        document.getElementById("livePreview").innerHTML = "";
    });

    // Language Selection (Changes CodeMirror Mode)
    document.getElementById("languageSelect").addEventListener("change", function () {
        let selectedLang = this.value;
        editor.setOption("mode", selectedLang);
    });

    // Save and Load functionality
    document.getElementById("saveButton").addEventListener("click", function () {
        const filename = prompt("Enter filename (with extension, e.g., code.js):");
        if (filename) {
            const codeContent = editor.getValue();
            fetch('http://localhost:3000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filename, code: codeContent })
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error('Error:', error));
        }
    });

    document.getElementById("loadButton").addEventListener("click", function () {
        const filename = prompt("Enter filename to load (with extension, e.g., code.js):");
        if (filename) {
            fetch(`http://localhost:3000/load/${filename}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('File not found');
                }
                return response.json();
            })
            .then(data => {
                editor.setValue(data.code);
            })
            .catch(error => alert(error.message));
        }
    });
});