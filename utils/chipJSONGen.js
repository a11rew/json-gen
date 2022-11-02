const jsonGen = (vals) => {
  const {
    format = "CHIP-0007",
    name = "",
    gender = "",
    description = "",
    minting_tool = "",
    sensitive_content = false,
    series_number = 0,
    series_total = 400,
  } = vals;

  const outputData = {
    name,
    description,
    series_number,
    series_total,
    sensitive_content,
    format,
    minting_tool,
    attributes: [
      {
        trait_type: "gender",
        value: gender,
      },
    ],
    collection: {
      name: "Zuri NFT Tickets for Free Lunch",
      id: "b774f676-c1d5-422e-beed-00ef5510c64d",
      attributes: [
        {
          type: "description",
          value: "Rewards for accomplishments during HNGi9.",
        },
      ],
    },
  };

  return outputData;
};

module.exports = jsonGen;
