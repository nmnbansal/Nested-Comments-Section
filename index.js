document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.getElementById('comments-container');

    window.addComment = function() {
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentElement = createCommentElement(commentText);
            // Insert the new comment element at the beginning of the comments container
            commentsContainer.prepend(commentElement);
            commentInput.value = '';
        }
    };

    window.addReply = function(button) {
        const commentElement = button.closest('.comment');
        const replyInput = commentElement.querySelector('.reply-input');
        const replyText = replyInput.value.trim();
        if (replyText) {
            const replyElement = createCommentElement(replyText);
            const replyContainer = commentElement.querySelector('.reply-container');
            replyContainer.appendChild(replyElement);
            replyInput.value = '';
            commentElement.querySelector('.reply-input-container').style.display = 'none';
        }
    };

    window.showReplyInput = function(button) {
        const commentElement = button.closest('.comment');
        const replyInputContainers = document.querySelectorAll('.reply-input-container');
        replyInputContainers.forEach(container => container.style.display = 'none'); // Hide all reply input sections
        const replyInputContainer = commentElement.querySelector('.reply-input-container');
        replyInputContainer.style.display = 'block';
    };

    function createCommentElement(commentText) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        const commentContent = document.createElement('p');
        commentContent.textContent = commentText;
        commentElement.appendChild(commentContent);

        const replyButton = document.createElement('button');
        replyButton.textContent = 'Add a reply';
        replyButton.onclick = function() { showReplyInput(replyButton); };
        commentElement.appendChild(replyButton);

        const replyInputContainer = document.createElement('div');
        replyInputContainer.className = 'reply-input-container';
        replyInputContainer.style.display = 'none';

        const replyInput = document.createElement('input');
        replyInput.type = 'text';
        replyInput.className = 'reply-input';
        replyInput.placeholder = 'Add a reply...';
        replyInputContainer.appendChild(replyInput);

        const submitReplyButton = document.createElement('button');
        submitReplyButton.textContent = 'Submit';
        submitReplyButton.onclick = function() { addReply(submitReplyButton); };
        replyInputContainer.appendChild(submitReplyButton);

        commentElement.appendChild(replyInputContainer);

        const replyContainer = document.createElement('div');
        replyContainer.className = 'reply-container';
        commentElement.appendChild(replyContainer);

        return commentElement;
    }
});
