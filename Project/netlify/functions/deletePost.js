exports.handler = async function(event, context) {
    const { user } = context.clientContext;
    if (!user || !["admin", "dev"].some(role => user.app_metadata.roles.includes(role))) {
      return { statusCode: 403, body: "Unauthorized" };
    }
  
    const { postId } = JSON.parse(event.body);
    // Code to delete the post with the given postId
    // (Store in database or JSON file as required)
  
    return {
      statusCode: 200,
      body: "Post deleted"
    };
  };
  