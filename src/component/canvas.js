import html2canvas from "html2canvas";
import Reactotron from "reactotron-react-js";

export default function canvas(element, doc_id){
    // Convert the div to image (canvas)
    html2canvas(document.querySelector(element)).then(function(canvas) {
        // Get the image data as JPEG and 0.9 quality (0.0 - 1.0)
        Reactotron.log(canvas.toDataURL("image/jpeg", 0.9));
        let element = document.createElement("a");
        element.href = canvas.toDataURL("image/jpeg", 0.9);
        element.download =
            "NMP Document Tracking Number: " + doc_id;
        element.click();

    });

    return true;
}