let deleteUuid = null;
function setDeleteUuid(uuid) {
  deleteUuid = uuid;
}
async function deleteEmployee() {
  if (!deleteUuid) {
    return;
  }
  try {
    const response = await fetch(`/api/user/${deleteUuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("exampleModal"),
      );
      modal.hide();
      if (window.location.pathname.includes("/edit/")) {
        window.location.href = "/";
      } else {
        document
          .querySelector(`[onclick="setDeleteUuid('${deleteUuid}')"]`)
          .closest("tr")
          .remove();
        deleteUuid = null;
      }
    } else {
      alert(data.message || "Failed to delete employee");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}
