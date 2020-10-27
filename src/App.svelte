<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetails from "./Meetups/MeetupDetails.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};
  let isLoading = true;

  // Pinging the firebase database with a fetch request.
  // By default this is a get so no config needed.
  fetch("https://svelte-course-e7a24.firebaseio.com/meetups.json")
    // In the first then block we are checking if the response is
    // in the 200 range and if not throwing a new error.
    .then((res) => {
      if (!res.ok) {
        throw new Error("An error has occured, please try again.");
      }
      // If we make it past the res.ok check then we return the
      // response parsed as json
      return res.json();
    })
    // After returning the response we have our data in a
    // rough form.
    .then((data) => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key,
        });
      }
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(loadedMeetups);
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
      isLoading = false;
    });

  function savedMeetup() {
    editMode = null;
    editedId = null;
  }

  function closeModal() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'add' || editMode === 'edit'}
      <EditMeetup
        id={editedId}
        on:save={savedMeetup}
        on:closemodal={closeModal} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={startEdit} />
    {/if}
  {:else}
    <MeetupDetails id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
