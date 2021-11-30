const post_id = document.querySelector('input[name="blogpost-id"]').value;
const editFormHandler = async function(event) {
    event.preventDefault();
    
    const blogpostTitle = document.querySelector('input[name="blogpost-title"]').value.trim();
    const blogpostContent = document.querySelector('textarea[name="blogpost-content"]').value.trim();

    const response = await fetch(`/api/blogpost/`, {
        method: 'PUT',
        body: JSON.stringify({
            title: blogpostTitle,
            content: blogpostContent,
        }),
        headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
        document.location.repalce('/dash');
    } else {
        alert('Failed to edit blogpost');
    }
    document.location.replace('/dash');
};

const deleteClickHandler = async function(event) {
    event.preventDefault();

    const response = await fetch(`/api/blogpost/${post_id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('Failed to delete blogpost');
    }
};
document.querySelector('#edit-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete-button').addEventListener('click', deleteClickHandler);
