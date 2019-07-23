const a = require('./index.js');

new a({
    libName: 'gitlab',
    auth: 'TaNb4q_Ep3Mtd5Kd2K1X',
    libOptions: {
        projectId: '13416628'
    }
})
.set({
    fileName: 'ExamleFile.txt',
    content: Buffer.from('lorem ipsum'),
    branch: 'master',
    message: 'Examle File.txt added',
    authorName: 'Examle User',
    authorEmail:  'user@examle.com'
})
.then(console.log)
.catch(console.error);
