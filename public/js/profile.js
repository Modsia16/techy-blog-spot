const newFormHandler = async function(event) {
    event.preventDefault();
    
    const blogpostTitle = document.querySelector('input[name="blogpost-title"]').value.trim();
    const blogpostContent = document.querySelector('textarea[name="blogpost-content"]').value.trim();
    await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({
        title: blogpostTitle,
        content: blogpostContent,
      }),
      headers: { 'Content-type': 'application/json' },
    });
  };

  document.querySelector('#new-blogpost-form').addEventListener('submit', newFormHandler);
  