function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('feedbackForm').style.display = 'block';
            document.getElementById('managerName').textContent = data.user.role;
            loadFeedback(data.user.role);
        } else {
            alert('Login failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function loadFeedback(managerRole) {
    fetch(`/api/feedback?manager=${managerRole}`)
    .then(response => response.json())
    .then(data => {
        const feedbackList = document.getElementById('feedbackList');
        feedbackList.innerHTML = '';
        data.forEach(feedback => {
            const feedbackItem = document.createElement('div');
            feedbackItem.textContent = feedback.reviewText;
            feedbackList.appendChild(feedbackItem);
        });
        document.getElementById('feedbackDisplay').style.display = 'block';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('reviewText').value;
    // Call your backend API to process the review
    fetch('/api/submitReview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Review submitted successfully');
        loadFeedback(data.review.cluster); // Assuming the cluster is the manager role
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
