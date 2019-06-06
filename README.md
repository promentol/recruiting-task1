# The Problem
Essentially the problem is topological sorting of dyrected acyclyc graph, where the vertex of the graphs are the given JSON objects, and there is a directed path between two vertex if and only if `a.tier < b.tier || (a.tier == b.tier && a.start < b.start)`. Usual topological sorting algorithm complexity is `O(m+n)` where `n` is number of vertexes and `m` is number of paths between two vertex, which in our worst case could be `n*n`

# Other Solution ideas
Basically we have an array of two dimension elements. We can take an advantage from the fact, that the second dimension, the `tier` is categorial data, and have limited set of possible values, and they constructed from one to another by omitting suffix (e.g. `2467-359-963` can become `2467-359`). The final solution will not include anything related to graph theory and vertexes. 

# Solution
The solution is to group elements by their second dimension - `tier`, then sort elements within each group by their first dimension `start`. It is trivial, that elements of the same group should be children of one another, and the root element will be the one with lowest `start`. So the next step is to loop over each group, get their root element, and try to place that element into another group's root element's children. Final step is to go over each element and sort their children by first dimension -  `start`.

# Solution Complexity
The complexity of worst case scenario is `O(n*logn)`. Despite nested loops, their complexity can be calculated to be almost are, and sortings are adding logarithmic complexity. Also let's not forget that some sorting algorithms like `quicksort` in the worst case can have `O(n*n)` complexity, despite the fact that on average it is behaving `O(n*logn)` complexity.
