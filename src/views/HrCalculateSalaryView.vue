<template>
    <div>

        <Menu />
        <CalculateSalary/>
    </div>
</template>

<script>
    import Menu from "@/components/Menu";
    import CalculateSalary from "@/components/hr/CalculateSalary";

    export default {
        name: "HrMain",
        components: {
            CalculateSalary,
            Menu,
        }
    }
</script>

<style scoped>

</style>