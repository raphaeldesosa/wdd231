let currentyear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentyear;

let lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = `Last Update: ${lastModified}`;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: false
    }
];

function displayCourses(filter = "all") {
    const courseList = document.getElementById('coursework');
    const courseContainer = document.getElementById('courseCards');
    courseList.innerHTML = '';
    courseContainer.innerHTML = '';

    let totalCredits = 0

    const filteredCourses = courses.filter(course => {
        return filter === "all" || course.subject === filter;
    });

    filteredCourses.forEach(course => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${course.subject} ${course.number} - ${course.title} - <span class="credits">${course.credits}credits</span>`;
        courseList.appendChild(listItem);
        
        totalCredits += course.credits;

        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p>Credits: ${course.credits}</p>`;

        courseContainer.appendChild(courseCard);
    });
    
    document.getElementById('total-credits').textContent = totalCredits;
}   
    
    
document.getElementById('allCourses').addEventListener('click', () => displayCourses("all"));
document.getElementById('cseCourses').addEventListener('click', () => displayCourses("CSE"));
document.getElementById('wddCourses').addEventListener('click', () => displayCourses("WDD"));

displayCourses();

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});
    

