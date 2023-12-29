<script lang="ts">
    export let user: User
</script>

<div class='container' title={user.emailAddress}>
    <div class='image'>
        <img src={user.avatarUrls['16x16']} alt="{user.displayName} avatar"/>
    </div>
    <div class='display-name'>{user.displayName}</div>
</div>

<style>
    .display-name{
        color: white;
    }

    .container{
        display: flex;
        flex-direction: row;
        align-items:center;

        padding: 2px;
        background-color: gray;
        border-radius: 2px;
        width: fit-content;
        height: fit-content;
        gap: 4px;
    }

    .image{
        display: flex;
        height: 16px;
        width: 16px;
    }
    img{
        height: 100%;
        width: 100%;
        border-radius: 8px;
    }
</style>