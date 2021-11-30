const post_id = document.querySelector('input[name="blogpost-id"]').value;
const commentFormHandler = async function(event) {
    event.preventDefault();
    
    const commentContent = document.querySelector('textarea[name="comment-content"]').value.trim();
   if (commengContent) {
       const response = await fetch(`/api/comment`, {
              method: 'POST',
                body: JSON.stringify({
                    post_id,
                    commentContent,
                }),
                headers: { 'Content-type': 'application/json' },
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to add comment');
            }
   };
};

document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);
