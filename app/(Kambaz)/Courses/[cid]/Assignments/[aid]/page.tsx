export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
            <textarea
                id="wd-description"
                defaultValue="The assignment is available online Submit a link to the landing page of"
            />
            <br />
            <div id="wd-assignments-editor">
                <label htmlFor="wd-name">Assignment Name</label>
                <input id="wd-name" defaultValue="A1 - ENV + HTML" />
                <br />
                <br />

                <textarea
                    id="wd-description"
                    defaultValue="The assignment is available online Submit a link to the landing page of"
                />
                <br />

                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <label htmlFor="wd-points">Points</label>
                    <input id="wd-points" defaultValue={100} />
                </div>

                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <label htmlFor="wd-assignment-groups">Assignment Group</label>
                    <select id="wd-assignment-groups">
                        <option>ASSIGNMENTS</option>
                    </select>
                </div>

                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <label htmlFor="wd-display-grade">Display Grade As</label>
                    <select id="wd-display-grade">
                        <option>Percentage</option>
                    </select>
                </div>

                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <label htmlFor="wd-submission-type">Submission Type</label>
                    <select id="wd-submission-type">
                        <option>Online</option>
                    </select>
                </div>

                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <label>Online Entry Options:</label><br />

                    <input type="checkbox" name="entry-option" id="wd-entryop-txt" />
                    <label htmlFor="wd-entryop-txt">Text Entry</label><br />

                    <input type="checkbox" name="entry-option" id="wd-entryop-url" />
                    <label htmlFor="wd-entryop-url">Website URL</label><br />

                    <input type="checkbox" name="entry-option" id="wd-entryop-rec" />
                    <label htmlFor="wd-entryop-rec">Media Recordings</label><br />

                    <input type="checkbox" name="entry-option" id="wd-entryop-ann" />
                    <label htmlFor="wd-entryop-ann">Student Annotations</label><br />

                    <input type="checkbox" name="entry-option" id="wd-entryop-file" />
                    <label htmlFor="wd-entryop-file">File Uploads</label><br />
                </div>

                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <label htmlFor="wd-text-assign-to">Assign to</label><br />
                    <input type="text" defaultValue={'Everyone'} id="wd-text-assign-to" /> <br />
                </div>

                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                    <label htmlFor="wd-text-fields-due"> Due</label><br />
                    <input type="date"
                        defaultValue="2024-05-13"
                        id="wd-text-fields-due" /><br />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "12px", marginBottom: "12px" }}>
                    <div>
                        <label htmlFor="wd-available-from">Available From</label><br />
                        <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
                    </div>
                    <div>
                        <label htmlFor="wd-available-until">Until</label><br />
                        <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
                    </div>
                </div>

                <hr />

                <div style={{ display: "flex", justifyContent: "flex-start", gap: "8px" }}>
                    <button>Save</button>
                    <button>Cancel</button>
                </div>

            </div>
        </div >
    );
}
