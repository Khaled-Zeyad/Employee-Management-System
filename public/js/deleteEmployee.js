let deleteUuid = null;
function setDeleteUuid(uuid) {
  deleteUuid = uuid;
}
async function deleteEmployee() {
  if (!deleteUuid) {
    return;
  }
  try {
    const response = await fetch(`/user/${deleteUuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      window.location.href = "/";
    } else {
      alert("Failed to delete employee");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}
