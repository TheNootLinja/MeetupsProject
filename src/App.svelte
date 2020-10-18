<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetails from "./Meetups/MeetupDetails.svelte";

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};

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

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  {#if page === 'overview'}
    <div class="meetup-controls">
      <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
    </div>
    {#if editMode === 'add' || editMode === 'edit'}
      <EditMeetup
        id={editedId}
        on:save={savedMeetup}
        on:closemodal={closeModal} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={startEdit} />
  {:else}
    <MeetupDetails id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
