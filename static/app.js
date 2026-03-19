// Static file upload and result processing in JavaScript

// Function to handle file upload
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // API call to upload the file
    fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('File uploaded successfully:', data);
        trackProgress(data.taskId);
    })
    .catch((error) => {
        console.error('Error uploading file:', error);
    });
}

// Function to track upload progress
function trackProgress(taskId) {
    const progressContainer = document.getElementById('progressContainer');
    const interval = setInterval(() => {
        fetch(`/api/progress/${taskId}`)
            .then(response => response.json())
            .then(data => {
                progressContainer.innerText = `Progress: ${data.progress}%`;
                if (data.progress === 100) {
                    clearInterval(interval);
                    displayParameters(data.parameters);
                }
            })
            .catch((error) => {
                console.error('Error tracking progress:', error);
            });
    }, 2000);
}

// Function to display extracted parameters
function displayParameters(parameters) {
    const paramsContainer = document.getElementById('paramsContainer');
    paramsContainer.innerHTML = '<h3>Extracted Parameters:</h3>';
    for (const param in parameters) {
        paramsContainer.innerHTML += `<p>${param}: ${parameters[param]}</p>`;
    }
    const downloadButton = document.getElementById('downloadResultsButton');
    downloadButton.disabled = false;
}

// Function to download results
function downloadResults() {
    fetch('/api/results')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'results.txt';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error('Error downloading results:', error);
        });
}

// Event listeners
document.getElementById('uploadButton').addEventListener('click', uploadFile);
document.getElementById('downloadResultsButton').addEventListener('click', downloadResults);
