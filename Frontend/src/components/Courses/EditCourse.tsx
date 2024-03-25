import { useEffect } from "react";

function EditCourse()   {

    useEffect(() => {
        // Extracting id from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    }, []);

    return (
        <div>
        <h1>Edit Course</h1>
        </div>
    );
}

export default EditCourse;