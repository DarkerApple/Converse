exports.handler = async function(event, context) {
    const { user } = context.clientContext;
    if (!user || !user.app_metadata.roles.includes("admin")) {
      return { statusCode: 403, body: "Unauthorized" };
    }
  
    const { userId } = JSON.parse(event.body);
    // Call Netlify Identity API to set roles
    const response = await fetch(`https://YOUR_SITE.netlify.app/.netlify/identity/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token.access_token}`
      },
      body: JSON.stringify({ app_metadata: { roles: ["user"] } })
    });
  
    return {
      statusCode: response.status,
      body: response.ok ? "User approved" : "Failed to approve user"
    };
  };
  