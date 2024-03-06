// script.js

let base64Image;

function convertImageToText() {
    const input = document.getElementById('imageInput');
    const text = document.getElementById('keyInputText').value;
    var position = document.getElementById('positionInput').value;

    const file = input.files[0];

    if (file && text) {
        if (position == ''){
            position = Math.floor(Math.random() * (100));
            
        }
        const reader = new FileReader();

        reader.onload = function (e) {
            const binaryData = e.target.result.split(',')[1];
            const encyptionKey = btoa(text).split("").map(a=> a.charCodeAt(0)).reduce((acc, curr) => acc + curr, 0)
            const alphabets = binaryData.split("")
            const asciiArray = alphabets.map(alphabet => alphabet.charCodeAt(0));
            const xorArray = asciiArray.map(asc => asc ^ encyptionKey)
        
            const textBlob = new Blob([xorArray], { type: 'text/plain' });
            const textFileLink = document.createElement('a');
            textFileLink.href = URL.createObjectURL(textBlob);
            textFileLink.download = 'image_data.txt';
            document.body.appendChild(textFileLink);
            textFileLink.click();
            document.body.removeChild(textFileLink);

            alert('Image converted to text successfully. Image data saved to image_data.txt.');
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please fill in all the required fields.');
    }
}
function downloadOutputImage() {
    const outputContainer = document.getElementById('outputImageContainer');

    // Ensure that the container has an image (check if the first child is an image)
    if (outputContainer.firstChild && outputContainer.firstChild.tagName === 'IMG') {
        const imgSrc = outputContainer.firstChild.src;

        // Create a temporary link to download the image
        const downloadLink = document.createElement('a');
        downloadLink.href = imgSrc;
        downloadLink.download = 'output_image.png'; // Change the filename if needed
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } else {
        alert('No image to download.');
    }
}

function deletePattern(inputString, patternToDelete) {
    const regex = new RegExp(patternToDelete, 'g');
    return inputString.replace(regex, '');
}

function convertTextToImage() {
    const input = document.getElementById('textFileInput');
    const decryptText = document.getElementById('keyOutputText').value;
    const file = input.files[0];

    if (file && decryptText) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            const textArray = text.split(",").map(Number);
            const encyptionKey = btoa(decryptText).split("").map(a=> a.charCodeAt(0)).reduce((acc, curr) => acc + curr, 0)
            const xorArray = textArray.map(xor => xor ^ encyptionKey)
            const resultArray = xorArray.map(num => String.fromCharCode(num))
            const binaryData = atob(resultArray.join(""))
            console.log(binaryData)

            const blob = new Blob([new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i))], { type: 'image/png' });
            const url = URL.createObjectURL(blob);

            const img = document.createElement('img');
            img.src = url;
            img.style.maxWidth = '100%';

            const outputContainer = document.getElementById('outputImageContainer');
            outputContainer.innerHTML = '';
            outputContainer.appendChild(img);
        };

        reader.readAsText(file);
    } else {
        alert('Please fill in all the required fields.');
    }
}
