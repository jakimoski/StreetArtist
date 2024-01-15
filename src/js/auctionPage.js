export const initAuctionPage = () => {
    // https://projects.brainster.tech/bidding/api 
    // POST
    // {amount: 200}

    // returns {}

    // start Timer 2:00

    const bidBtn = document.querySelector('#bidBtn')
    const bidInput = document.querySelector('#biddingInput')
    const biddingHistory = document.querySelector('#biddingHistory')


    bidBtn.addEventListener('click', function () {
        // reset Timer to 2:00

        const myBidFormData = new FormData()
        myBidFormData.set('amount', bidInput.value)

        biddingHistory.innerHTML += `<li class="mine">${bidInput.value}</li>`

        fetch('https://projects.brainster.tech/bidding/api', {
            method: 'POST',
            body: myBidFormData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                const isBidding = data.isBidding

                if (isBidding) {
                    biddingHistory.innerHTML += `<li class="bidder" style="margin-left: 200px">${data.bidAmount}</li>`
                    bidInput.value = data.bidAmount + 50
                } else {
                    // wait until timer is done, and complete acution

                    // reset variables
                    // update auctioning item 
                    // priceSold: highestBid, dateSold: new Date(), isAuctioning: false
                }
            })

    })

}