import type { NextApiRequest, NextApiResponse } from "next";

export type NLPRequest = {
  text: string;
};

export type NLPResponse = {
  granularity: "word" | "sentence" | "paragraph" | "document" | "error";
  components: {
    text: string;
    type: string;
    score: number;
  }[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NLPResponse>
) {
  const { text } = req.body as NLPRequest;

  if (!text || typeof text !== "string" || text.length === 0) {
    res.status(400).json({
      granularity: "error",
      components: [],
    });
    return;
  }

  const [title, ...content] = text
    .split("\n")
    .filter((line) => line.length > 0);

  const response: NLPResponse = {
    granularity: "paragraph",
    components: [
      {
        text: title,
        type: "title",
        score: 1,
      },
    ],
  };

  // randomly set some paragraphs to be "important" and some to be "unimportant", others to be "neutral"
  const components = content.map((paragraph) => ({
    text: paragraph,
    type: ["important", "unimportant", "neutral"][
      Math.floor(Math.random() * 3)
    ],
    score: Math.random(),
  }));

  response.components.push(...components);

  res.status(200).json(response);
}
