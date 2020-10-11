<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let editMode;

  function addMeetup() {
    editMode = null;
  }

  function closeModal() {
    editMode = null;
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
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:closemodal={closeModal} />
  {/if}
  <MeetupGrid meetups={$meetups} />
</main>
