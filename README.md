# CDN on Git Server

A library that can be used to store and manage files on a git server (GitHub, GitLab etc.)

# Using

```javascript
const CDNOnGitServer = require('cdn-on-gitserver');

const GitCDN = new CDNOnGitServer({
    libName: 'gitlab',
    auth: '<your auth token>',
    libOptions: {
        projectId: '12345678'
    }
});


/* get cdn file
 * @data: Buffer
*/
GitCDN.get('file.txt')
.then(data => console.log(data));


/* get cdn file
 * * * * * *
 * Response
 * @status: boolean, ex: true
*/
GitCDN.set({
    fileName: 'file.txt', // required
    content: Buffer.from('lorem ipsum'), // required
    branch: 'master', // optional, default master
    message: 'file.txt added', // optional, default ${fileName} file added.
    authorName: 'Examle User', // optional
    authorEmail:  'user@examle.com', // optional
})
.then(status => console.log);
```