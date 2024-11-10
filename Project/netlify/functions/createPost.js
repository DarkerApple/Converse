exports.handler = async function(event, context) {
    const { user } = context.clientContext;
    if (!user) {
      return { statusCode: 403, body: "Unauthorized" };
    }
  
    const { title, content } = JSON.parse(event.body);
    const newPost = {
      title,
      content,
      author: user.user_metadata.full_name,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
  
    // Store in a database or JSON file (implement as needed)
    // For simplicity, this example does not persist data
  
    return {
      statusCode: 200,
      body: JSON.stringify(newPost)
    };
  };
  