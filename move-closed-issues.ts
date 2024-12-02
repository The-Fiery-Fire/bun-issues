import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";

// GitHub repo details
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = "oven-sh";
const repo = "bun"; // Replace with your actual repo name

// Folder paths
const issuesDir = "./issues";
const closedDir = "./closed";

// Fetch closed issues
async function fetchClosedIssues() {
    try {
        const { data } = await octokit.rest.issues.listForRepo({
            owner,
            repo,
            state: "closed",
            per_page: 100,
            sort: "updated",
            direction: "desc",
        });
        return data;
    } catch (error) {
        console.error("Error fetching issues:", error);
        return [];
    }
}

// Move folders based on closed issue IDs
function moveFolders(issueIds: number[]) {
    fs.readdirSync(issuesDir).forEach((folderName) => {
        const folderPath = path.join(issuesDir, folderName);
        const destinationPath = path.join(closedDir, folderName);

        // If folder name matches an issue ID, move the folder
        if (issueIds.includes(Number(folderName))) {
            console.log(`Moving folder: ${folderName}`);
            fs.renameSync(folderPath, destinationPath);
        }
    });
}

// Main function
async function main() {
    const closedIssues = await fetchClosedIssues();
    const issueIds = closedIssues.map((issue) => issue.number);

    // Move folders corresponding to closed issues
    moveFolders(issueIds);
}

main();
