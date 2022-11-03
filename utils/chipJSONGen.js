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
    attributes,
  } = vals;

  const rawAttributes = attributes.split(";");
  // Split each attribute into key and value with a colon
  const attributesArray = rawAttributes.map((attr) => {
    const [key, value] = attr.split(":");
    return {
      trait_type: key ? key.trim() : "",
      value: value ? value.trim() : "",
    };
  });

  const outputData = {
    name,
    description,
    series_number,
    series_total,
    sensitive_content,
    format,
    minting_tool,
    attributes: attributesArray,
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
