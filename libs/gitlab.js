const fetch = require('node-fetch');
const FormData = require('form-data');

const API_URL = 'https://gitlab.com/api/v4/';

function GitLab(options, auth) {
    const url = options.url;
    const projectId = options.projectId;
    const defaultName = options.name;
    const defaultEmail = options.email;

    if (!projectId)
        throw new Error('projectId required!');

    return {
        get: (fileName) => {
            return fetch(`${url || API_URL}projects/${projectId}/repository/files/${fileName}?ref=master`, {
                method: 'GET',
                headers: {
                    'PRIVATE-TOKEN': auth,
                },
            })
            .then(status => {
                if (status.status !== 200) {
                    throw status;
                }

                return status.json();
            })
            .then(gitlabFile => {
                if (!gitlabFile)
                    return null;

                var data = Buffer.from(gitlabFile.content, 'base64');

                return data;
            });
        },
        set: (file) => {
            const fileName = file.fileName;
            const content = file.content;
            const branch = file.branch;
            const message = file.message || (file.fileName + ' file added.');
            const name = file.authorName;
            const email = file.authorEmail;

            const form = new FormData();
            form.append('content', content.toString('base64'));
            form.append('branch', branch || 'master');
            form.append('commit_message', message);
            form.append('encoding', 'base64');

            if (defaultEmail || email) {
                form.append('author_email', email || defaultEmail);
            }

            if (defaultName || name) {
                form.append('author_name', name || defaultName);
            }

            return fetch(`${url || API_URL}projects/${projectId}/repository/files/${fileName}`, {
                method: 'POST',
                headers: {
                    'PRIVATE-TOKEN': auth,
                },
                body: form,
            })
            .then((gitlabResponse) => {
                if (gitlabResponse.status !== 201) {
                    throw gitlabResponse;
                }

                return true;
            });
        },
    }
}

module.exports = GitLab;