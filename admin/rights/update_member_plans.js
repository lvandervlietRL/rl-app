plan-selection

const allPlansDiv = document.querySelector('.all-plans');


      // Get all available plans
      const allPlansResponse = await window.$memberstackDom.getPlans();
      const allPlans = allPlansResponse.data;
      
      // Get current member's plan connections
      const memberResponse = await window.$memberstackDom.getCurrentMember();
      const memberData = memberResponse.data;
      const assignedPlans = memberData.planConnections.map(connection => connection.planId);