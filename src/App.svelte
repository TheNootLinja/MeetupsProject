<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let editMode;

  // let meetups = [
  //   {
  //     id: "m1",
  //     title: "Coding Bootcamp",
  //     subtitle: "Learn to code in 2 hours",
  //     description:
  //       "In this meetup, we will have some experts to teach you how to code",
  //     image: "https://picsum.photos/1000/1000",
  //     address: "27th Nerd Road, 32523 New York",
  //     contactEmail: "code@test.com",
  //     isFavorite: false,
  //   },
  //   {
  //     id: "m2",
  //     title: "Svelte Together",
  //     subtitle: "Let's learn Svelte together!",
  //     description: "Just another description for our date",
  //     image: "https://picsum.photos/1000/1000",
  //     address: "29th Nerd Road, 32523 New York",
  //     contactEmail: "code@test.com",
  //     isFavorite: false,
  //   },

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
